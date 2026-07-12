export const DEMO_ORG_ID = '00000000-0000-4000-8000-000000000001'
export const DEMO_USER_ID = '00000000-0000-4000-8000-000000000101'
export const DEMO_ADMIN_ID = '00000000-0000-4000-8000-000000000102'

export type Actor = { userId: string; organizationId: string; role: 'employee' | 'manager' | 'admin' }

export function getDemoActor(role: Actor['role'] = 'employee'): Actor {
  return {
    userId: role === 'admin' ? DEMO_ADMIN_ID : DEMO_USER_ID,
    organizationId: DEMO_ORG_ID,
    role,
  }
}

export function requireRole(actor: Actor, allowed: Actor['role'][]) {
  if (!allowed.includes(actor.role)) throw new Error('Forbidden')
}
