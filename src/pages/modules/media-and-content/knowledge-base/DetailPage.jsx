import { Button, Card, FileInput, Grid, Group, Image, Select, Stack, Text, TextInput, Title } from '@mantine/core'

function Page({ selectedId }) {
  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Knowledge Base Details #1029</Title>
          <Text c="dimmed">Detail view from specs/pages/Media & Content/Knowledge Base/detail.md.</Text>
          <Text size="sm" c="dimmed">
            Record: {selectedId || 'No record selected'}
          </Text>
        </div>
        <Group>
          <Button variant="default">Cancel</Button>
          <Button variant="light">Duplicate</Button>
          <Button>Save Changes</Button>
        </Group>
      </Group>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Section 1: Primary Category Name - e.g., Basic Information</Text>
          <Text size="sm" c="dimmed">Brief summary of what this section handles.</Text>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput label="Main Menu Name" required placeholder="" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap={6}>
                <Text size="sm" fw={500}>
                  Icon Image Preview
                </Text>
                <Image src="https://picsum.photos/seed/kb-main-icon/120/72" alt="Main menu icon preview" w={120} h={72} radius="sm" fit="cover" />
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <FileInput label="Upload Image" required placeholder="" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                type="url"
                label="Main Menu URL"
                required
                placeholder=""
                description="https://www.shera.com/th/catalog"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select label="Status" required data={['Public', 'Hidden']} defaultValue="Public" />
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="xs">
          <Text fw={700}>Section 3: Additional Info</Text>
          <Group justify="space-between">
            <Text c="dimmed">Created By</Text>
            <Text>System Label</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">Last Modified</Text>
            <Text>Timestamp</Text>
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
