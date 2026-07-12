import React, { useState, useEffect } from "react";
import { MapPin, ArrowUp, ArrowDown, Share2, Clock, AlertTriangle, Image as ImageIcon, X, Maximize2 } from "lucide-react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Helper: Haversine formula to calculate distance in km
function getDistanceInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Helper: Format relative time
function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

export default function CivicBook() {
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState("");

    // 🔥 NEW: State to track which image is currently being viewed full-screen
    const [selectedImage, setSelectedImage] = useState(null);

    const currentUser = JSON.parse(localStorage.getItem("evora_loggedInUser"));

    // 1. Get User Location & Fetch Local Feed
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
                    setUserLocation(loc);
                    fetchLocalFeed(loc);
                },
                (error) => {
                    console.error("GPS Error:", error);
                    setLocationError("Please enable GPS to see issues near you.");
                    const fallbackLoc = { lat: 28.4089, lng: 77.3178 };
                    setUserLocation(fallbackLoc);
                    fetchLocalFeed(fallbackLoc);
                }
            );
        }
    }, []);

    const fetchLocalFeed = async (currentLoc) => {
        try {
            const querySnapshot = await getDocs(collection(db, "reports"));
            const allReports = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                upvotes: doc.data().upvotes || 0,
                downvotes: doc.data().downvotes || 0,
                upvotedBy: doc.data().upvotedBy || [],
                downvotedBy: doc.data().downvotedBy || []
            }));

            const localReports = allReports.filter(report => {
                if (!report.location) return false;
                const distance = getDistanceInKm(
                    currentLoc.lat, currentLoc.lng,
                    report.location.lat, report.location.lng
                );
                report.distanceAway = distance.toFixed(1);
                return distance <= 3.0;
            });

            localReports.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
            setFeed(localReports);
        } catch (error) {
            console.error("Error fetching feed:", error);
        } finally {
            setLoading(false);
        }
    };

    // 2. Handle Voting
    const handleVote = async (post, voteType) => {
        if (!currentUser || !currentUser.uid) {
            return alert("You must be logged in to vote on civic issues.");
        }

        const uid = currentUser.uid;
        let newUpvotes = post.upvotes;
        let newDownvotes = post.downvotes;
        let newUpvotedBy = [...post.upvotedBy];
        let newDownvotedBy = [...post.downvotedBy];

        const hasUpvoted = newUpvotedBy.includes(uid);
        const hasDownvoted = newDownvotedBy.includes(uid);

        if (voteType === 'up') {
            if (hasUpvoted) {
                newUpvotedBy = newUpvotedBy.filter(id => id !== uid);
                newUpvotes--;
            } else {
                newUpvotedBy.push(uid);
                newUpvotes++;
                if (hasDownvoted) {
                    newDownvotedBy = newDownvotedBy.filter(id => id !== uid);
                    newDownvotes--;
                }
            }
        } else if (voteType === 'down') {
            if (hasDownvoted) {
                newDownvotedBy = newDownvotedBy.filter(id => id !== uid);
                newDownvotes--;
            } else {
                newDownvotedBy.push(uid);
                newDownvotes++;
                if (hasUpvoted) {
                    newUpvotedBy = newUpvotedBy.filter(id => id !== uid);
                    newUpvotes--;
                }
            }
        }

        setFeed(prevFeed => prevFeed.map(p => {
            if (p.id === post.id) {
                return {
                    ...p,
                    upvotes: newUpvotes,
                    downvotes: newDownvotes,
                    upvotedBy: newUpvotedBy,
                    downvotedBy: newDownvotedBy
                };
            }
            return p;
        }));

        try {
            const postRef = doc(db, "reports", post.id);
            await updateDoc(postRef, {
                upvotes: newUpvotes,
                downvotes: newDownvotes,
                upvotedBy: newUpvotedBy,
                downvotedBy: newDownvotedBy
            });
        } catch (error) {
            console.error("Vote failed:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white font-inter pt-28 pb-20 px-4 relative">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Civic Book</h1>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                        <MapPin size={16} className="text-[#00ff9d]" />
                        {locationError ? <span className="text-red-400">{locationError}</span> : "Showing civic issues within 3 km of your location"}
                    </p>
                </div>

                {/* Feed */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-4 border-[#00ff9d] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : feed.length === 0 ? (
                    <div className="bg-[#0a0f1b] border border-gray-800 rounded-2xl p-10 text-center max-w-2xl mx-auto">
                        <h3 className="text-xl font-bold text-white mb-2">All clear!</h3>
                        <p className="text-gray-400">There are no reported civic issues within 3km of your location.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {feed.map((post) => {
                            const isUpvoted = currentUser && post.upvotedBy.includes(currentUser.uid);
                            const isDownvoted = currentUser && post.downvotedBy.includes(currentUser.uid);
                            const netScore = post.upvotes - post.downvotes;

                            return (
                                <div key={post.id} className="bg-[#0a0f1b] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors shadow-lg flex flex-col h-full">

                                    {/* Post Header */}
                                    <div className="p-4 flex items-center justify-between border-b border-gray-800/50 shrink-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold">
                                                {(post.citizenName || "C").charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm text-gray-200 truncate max-w-[120px] sm:max-w-[150px]">{post.citizenName || "Anonymous Citizen"}</h4>
                                                <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                                                    <span className="flex items-center gap-1"><Clock size={10} /> {timeAgo(post.timestamp)}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1 text-[#00ff9d]"><MapPin size={10} /> {post.distanceAway} km</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider whitespace-nowrap ${post.severity === "Critical" ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                                            post.severity === "High" ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" :
                                                "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                                            }`}>
                                            {post.severity}
                                        </div>
                                    </div>

                                    {/* 🔥 Updated Image Render: Added onClick and hover effects */}
                                    {(post.imageUrl || post.imageBase64) ? (
                                        <div
                                            className="w-full h-48 bg-black overflow-hidden border-b border-gray-800/50 shrink-0 relative group cursor-pointer"
                                            onClick={() => setSelectedImage(post.imageUrl || post.imageBase64)}
                                        >
                                            <img
                                                src={post.imageUrl || post.imageBase64}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-75"
                                            />
                                            {/* Hover Expand Icon */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-black/60 p-3 rounded-full text-white backdrop-blur-sm">
                                                    <Maximize2 size={24} />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-32 bg-[#050810] border-b border-gray-800/50 flex flex-col items-center justify-center text-gray-700 shrink-0">
                                            <ImageIcon size={24} className="mb-1 opacity-50" />
                                            <span className="text-[10px] uppercase tracking-widest font-bold">No Image Provided</span>
                                        </div>
                                    )}

                                    {/* Post Body */}
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="text-base font-bold text-white mb-2 leading-tight">{post.title}</h3>
                                        <p className="text-gray-400 text-xs mb-4 leading-relaxed line-clamp-3">{post.description}</p>

                                        {/* AI Context Card */}
                                        <div className="mt-auto">
                                            {post.aiData && (
                                                <div className="bg-[#020617] p-3 rounded-xl border border-gray-800 flex gap-2 items-start">
                                                    <AlertTriangle size={14} className="text-blue-400 shrink-0 mt-0.5" />
                                                    <div className="min-w-0">
                                                        <span className="text-[10px] font-bold text-gray-300 block mb-1 uppercase tracking-wide">AI Assessed Risk</span>
                                                        <div className="flex flex-wrap gap-1">
                                                            {(post.aiData.health_risks || []).slice(0, 2).map((risk, i) => (
                                                                <span key={i} className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-gray-400 border border-gray-800 truncate max-w-full">{risk}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Interaction Bar */}
                                    <div className="px-4 py-3 border-t border-gray-800 flex items-center justify-between bg-black/20 shrink-0">
                                        <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
                                            <button
                                                onClick={() => handleVote(post, 'up')}
                                                className={`p-1.5 sm:p-2 rounded-full transition-colors ${isUpvoted ? 'text-[#00ff9d] bg-[#00ff9d]/10' : 'text-gray-400 hover:text-[#00ff9d] hover:bg-white/10'}`}
                                            >
                                                <ArrowUp size={16} />
                                            </button>

                                            <span className={`font-bold text-xs sm:text-sm min-w-[20px] text-center ${isUpvoted ? 'text-[#00ff9d]' : isDownvoted ? 'text-red-400' : 'text-white'}`}>
                                                {netScore}
                                            </span>

                                            <button
                                                onClick={() => handleVote(post, 'down')}
                                                className={`p-1.5 sm:p-2 rounded-full transition-colors ${isDownvoted ? 'text-red-400 bg-red-400/10' : 'text-gray-400 hover:text-red-400 hover:bg-white/10'}`}
                                            >
                                                <ArrowDown size={16} />
                                            </button>
                                        </div>

                                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-white/5 text-gray-400 transition-colors text-xs font-medium">
                                            <Share2 size={14} /> <span>Share</span>
                                        </button>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* 🔥 FULL SCREEN IMAGE MODAL */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)} // Click anywhere on background to close
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white/10 hover:bg-[#00ff9d] hover:text-black text-white p-3 rounded-full transition-all z-[110]"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent trigger background click
                            setSelectedImage(null);
                        }}
                    >
                        <X size={24} />
                    </button>

                    {/* Uncropped Image */}
                    <img
                        src={selectedImage}
                        alt="Full Screen view"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-gray-800"
                        onClick={(e) => e.stopPropagation()} // Clicking the image doesn't close it
                    />
                </div>
            )}
        </div>
    );
}