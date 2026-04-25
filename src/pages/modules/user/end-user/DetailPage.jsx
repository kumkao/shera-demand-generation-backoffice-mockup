import { Badge, Button, Card, Grid, Group, Select, Stack, Text, TextInput, Title } from '@mantine/core'

function Page({ selectedId }) {
  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>View End-user detail</Title>
          <Text c="dimmed">Detail view from specs/pages/User/End-user/detail.md.</Text>
          <Text size="sm" c="dimmed">
            Record: {selectedId || 'No record selected'}
          </Text>
        </div>
        <Group>
          <Button variant="default">Cancel</Button>
          <Button color="red" variant="light">
            Delete
          </Button>
        </Group>
      </Group>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Section 1: Basic Information</Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="ID (Required)" value="U000123" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select label="Type (Required)" data={['Contractor', 'Technician', 'Designer']} value="Contractor" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select label="Active (Required)" data={['Active', 'Inactive']} value="Active" />
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Section 2: Social Detail</Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Group align="end" wrap="nowrap">
                <TextInput label="LINE ID (Required)" value="@enduser_01" readOnly w="100%" />
                <Badge variant="light" color="green" mb={5}>
                  Linked
                </Badge>
              </Group>
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Section 3: Personal information</Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Name (Required)" value="Suda" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Last Name (Required)" value="Wong" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Telephone (Required)" value="081-234-5678" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Email (Required)" value="suda.wong@example.com" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Address (Required)" value="99 Sukhumvit Road" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput label="Privince (Required)" value="Bangkok" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput label="Distinct (Required)" value="Watthana" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput label="Sub-distinct (Required)" value="Khlong Toei Nuea" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput label="Zipcode (Required)" value="10110" readOnly />
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="xs">
          <Text fw={700}>Section 3: Additional Info</Text>
          <Group justify="space-between">
            <Text c="dimmed">Last Modified</Text>
            <Text>Date in YYYY-MM-DD HH:mm:ss</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">Registered Date</Text>
            <Text>Date in YYYY-MM-DD HH:mm:ss</Text>
          </Group>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Group justify="space-between" align="center">
          <Button color="red" variant="light">
            Delete
          </Button>
          <Group>
            <Button variant="default">Cancel</Button>
            <Button>Submit</Button>
          </Group>
        </Group>
      </Card>
    </Stack>
  )
}

export default Page
