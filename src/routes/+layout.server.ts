// src/routes/+layout.server.ts
export const load = async ({ locals: { getSession } }) => {
    return {
      supabaseAuthSession: await getSession(),
    }
}