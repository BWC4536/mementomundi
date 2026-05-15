'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signInAction(formData: { email: string; password: string }) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })
  if (error) {
    if (error.message.toLowerCase().includes('invalid')) {
      return { error: 'Email o contraseña incorrectos' }
    }
    if (error.message.toLowerCase().includes('email not confirmed')) {
      return { error: 'Confirma tu email antes de iniciar sesión' }
    }
    return { error: 'No se pudo iniciar sesión. Inténtalo de nuevo.' }
  }
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function signUpAction(formData: {
  name: string
  email: string
  password: string
  newsletter: boolean
}) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        display_name: formData.name,
        subscribe_newsletter: formData.newsletter,
      },
    },
  })
  if (error) {
    const msg = error.message.toLowerCase()
    if (msg.includes('already registered') || msg.includes('already been registered') || msg.includes('user already')) {
      return { error: 'Este email ya está en uso' }
    }
    if (msg.includes('weak password') || msg.includes('password')) {
      return { error: 'Contraseña demasiado débil' }
    }
    return { error: 'No se pudo crear la cuenta. Inténtalo de nuevo.' }
  }
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/tienda')
}

export async function resetPasswordAction(formData: { email: string; origin: string }) {
  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
    redirectTo: `${formData.origin}/auth/callback?next=/recuperar-password/actualizar`,
  })
  if (error) {
    if (error.message.toLowerCase().includes('rate limit')) {
      return { error: 'Demasiados intentos. Espera unos minutos antes de volver a probar.' }
    }
    return { error: 'No se pudo enviar el email. Inténtalo de nuevo.' }
  }
  return { success: true }
}

export async function updatePasswordAction(formData: { password: string }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Sesión expirada. Vuelve a solicitar el email de recuperación.' }
  }
  const { error } = await supabase.auth.updateUser({ password: formData.password })
  if (error) {
    if (error.message.toLowerCase().includes('same')) {
      return { error: 'La contraseña nueva debe ser distinta de la anterior.' }
    }
    if (error.message.toLowerCase().includes('weak')) {
      return { error: 'Contraseña demasiado débil.' }
    }
    return { error: 'No se pudo actualizar la contraseña. Inténtalo de nuevo.' }
  }
  revalidatePath('/', 'layout')
  return { success: true }
}
