import { useMemo, useState } from 'react'
import { Box, Button, Card, CardContent, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import { authenticate } from '../services/auth'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { login } = useAuth()

    const backgroundStyle = useMemo(() => ({
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(180deg, #0a5ea3 0%, #1b5f94 35%, #2b5f86 100%)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
    }), [])

    const handleToggleShowPassword = () => setShowPassword((v) => !v)

    const handleSubmit = async () => {
        setErrorMessage(null)
        setSubmitting(true)
        try {
            const { accessToken } = await authenticate({ username, password })
            login(accessToken)
        } catch (err) {
            setErrorMessage('Falha no login. Verifique suas credenciais.')
        } finally {
            setSubmitting(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            void handleSubmit()
        }
    }

    return (
        <Box style={backgroundStyle}>
            <Card elevation={6} style={{ width: 520, borderRadius: 12 }}>
                <CardContent style={{ padding: 32 }}>
                    <Box style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                        <img src="/logo-ics.svg" alt="ICS" style={{ width: 120, height: 'auto' }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" align="center" style={{ marginBottom: 24 }}>
                        Faça login para acessar o sistema
                    </Typography>

                    <Typography variant="subtitle2" style={{ marginBottom: 6 }}>Login</Typography>
                    <TextField
                        placeholder="Digite seu login"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">👤</InputAdornment>,
                        }}
                    />

                    <Typography variant="subtitle2" style={{ marginTop: 16, marginBottom: 6 }}>Senha</Typography>
                    <TextField
                        placeholder="Digite sua senha"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">🔒</InputAdornment>,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleToggleShowPassword} edge="end" size="small" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                                        <span role="img" aria-hidden>{showPassword ? '🙈' : '👁️'}</span>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    {errorMessage && (
                        <Typography variant="caption" color="error" style={{ marginTop: 8, display: 'block' }}>
                            {errorMessage}
                        </Typography>
                    )}

                    <Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                        <Link href="#" underline="hover" variant="caption">Esqueceu a senha?</Link>
                    </Box>

                    <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        style={{ marginTop: 16, backgroundColor: '#0a5ea3' }}
                        startIcon={<span style={{ display: 'inline-block', transform: 'translateY(1px)' }}>➡️</span>}
                        disabled={!username || !password || submitting}
                        onClick={() => { void handleSubmit() }}
                    >
                        {submitting ? 'Entrando...' : 'Entrar'}
                    </Button>
                </CardContent>
            </Card>

            <Box style={{ position: 'fixed', bottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src="/logo.svg" alt="Cittati" style={{ height: 80 }} />
            </Box>
        </Box>
    )
}


