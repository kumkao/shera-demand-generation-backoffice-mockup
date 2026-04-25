import { Badge, Button, Card, FileInput, Grid, Group, Image, Select, Stack, Text, TextInput, Title } from '@mantine/core'

function Page({ selectedId }) {
  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>View Agent & Sub-agent detail</Title>
          <Text c="dimmed">Detail view from specs/pages/User/Agent & Sub-agent Management/detail.md.</Text>
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
              <TextInput label="ID (Required)" placeholder="Text" value="AGT-000123" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Group align="end" wrap="nowrap">
                <Select label="Type (Required)" data={['Agent', 'Sub-agent']} value="Agent" w="100%" />
                <Badge variant="light" color="blue" mb={5}>
                  Agent
                </Badge>
              </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                label="Status (Required)"
                data={['Not Verified', 'Verified', 'Waiting For Approve']}
                value="Verified"
              />
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
                <TextInput label="LINE ID (Required)" placeholder="Badge/Pill Component" value="@agentline01" readOnly />
                <Badge variant="light" color="green" mb={5}>
                  Connected
                </Badge>
              </Group>
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Section 3: Shop information</Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap={6}>
                <Text size="sm" fw={500}>
                  Image Preview (Required)
                </Text>
                <Image src="https://picsum.photos/seed/shop/400/240" alt="Shop preview" radius="md" h={120} fit="cover" />
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <FileInput label="Upload Image (Required)" placeholder="FileInput" accept="image/png,image/jpeg" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Name (Required)" value="Somchai" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Last Name (Required)" value="Prasert" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Shop Name (Required)" value="Prasert Trading" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Branch (Required)" value="Bangkok Central" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Owner Telephone (Required)" value="089-123-4567" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="TAX ID (Required)" value="0105551234567" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Email (Required)" value="owner@prasert-trading.com" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Address (Required)" value="123 Rama IV Rd" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput label="Privince (Required)" value="Bangkok" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput label="Distinct (Required)" value="Pathum Wan" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput label="Sub-distinct (Required)" value="Lumphini" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput label="Zipcode (Required)" value="10330" readOnly />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <TextInput label="Latitude/Longitude (Required)" value="13.7304, 100.5334" readOnly />
            </Grid.Col>
            <Grid.Col span={12}>
              <Stack gap={6}>
                <Text size="sm" fw={500}>
                  Map Preview (Required)
                </Text>
                <Image src="https://picsum.photos/seed/map/900/240" alt="Map preview" radius="md" h={160} fit="cover" />
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="xs">
          <Text fw={700}>Section 3: Additional Info</Text>
          <Group justify="space-between">
            <Text c="dimmed">Created By</Text>
            <Text>User Name</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">Last Modified</Text>
            <Text>Date in YYYY-MM-DD HH:mm:ss</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">Created Date</Text>
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
