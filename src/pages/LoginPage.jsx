import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Group, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconAt, IconLock } from '@tabler/icons-react'

function LoginPage({ onLogin, loginSpec }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const helperText = useMemo(() => {
    return loginSpec.includes('Forget password')
      ? 'Use your email and password to access the admin portal.'
      : 'Enter your credentials to continue.'
  }, [loginSpec])

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin({ username })
  }

  return (
    <div className="login-bg">
      <Container size={460} py={64}>
        <Paper className="login-card" withBorder radius="xl" p={32}>
          <Stack gap="xl">
            <div>
              <Text className="eyebrow">Shera Backoffice</Text>
              <Title order={2}>Sign in</Title>
              <Text c="dimmed" mt={6}>
                {helperText}
              </Text>
            </div>

            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <TextInput
                  label="Username"
                  placeholder="admin@shera.io"
                  leftSection={<IconAt size={16} />}
                  value={username}
                  onChange={(event) => setUsername(event.currentTarget.value)}
                  required
                />
                <PasswordInput
                  label="Password"
                  placeholder="Enter password"
                  leftSection={<IconLock size={16} />}
                  value={password}
                  onChange={(event) => setPassword(event.currentTarget.value)}
                  required
                />
                <Group justify="space-between" mt="xs">
                  <Button variant="subtle" component={Link} to="/login" px={0}>
                    Forget password
                  </Button>
                  <Button type="submit" radius="md">
                    Login
                  </Button>
                </Group>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Container>
    </div>
  )
}

export default LoginPage
