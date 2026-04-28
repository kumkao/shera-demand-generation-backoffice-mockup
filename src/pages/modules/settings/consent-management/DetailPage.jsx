import { useState } from 'react'
import { Button, Card, Group, List, Select, Stack, Switch, Text, TextInput, Title } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/react'

function Page({ selectedId }) {
  const [content, setContent] = useState('<p>Please read and accept this consent before continuing.</p>')
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor: activeEditor }) => {
      setContent(activeEditor.getHTML())
    },
  })

  return (
    <Stack gap="md" maw={980} mx="auto" w="100%">
      <Group justify="space-between" align="center">
        <div>
          <Title order={2}>Consent Details</Title>
          <Text c="dimmed">Detail view from specs/pages/Settings/Consent Management/detail.md.</Text>
          <Text size="sm" c="dimmed">
            Record: {selectedId || 'No record selected'}
          </Text>
        </div>
      </Group>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Section 1: Consent Metadata</Text>
          <Text size="sm" c="dimmed">
            Define consent identity and scope by user type.
          </Text>
          <TextInput label="Consent Title" required placeholder="e.g., PDPA Consent 2026" />
          <Select
            label="User Type"
            required
            data={['Agent', 'Sub-agent', 'End-user']}
            placeholder="Agent / Sub-agent / End-user"
          />
          <TextInput
            label="Consent Version"
            required
            placeholder="e.g., v1.0.0 (Must be unique per selected User Type)"
          />
          <Switch
            label="Status"
            description="Active / Inactive"
            onLabel="Active"
            offLabel="Inactive"
          />
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Section 2: Consent Content</Text>
          <Text size="sm" c="dimmed">
            Use this section to compose and format consent text.
          </Text>
          <Stack gap={6}>
            <Text size="sm" fw={500}>
              Content Editor
            </Text>
            <RichTextEditor editor={editor}>
              <RichTextEditor.Toolbar sticky stickyOffset={64}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Blockquote />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content
                style={{ minHeight: 220 }}
              />
            </RichTextEditor>
          </Stack>
          <Card withBorder radius="sm" p="sm" bg="gray.0">
            <Stack gap={6}>
              <Text fw={600}>Inline Preview</Text>
              {content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <Text size="sm" c="dimmed">
                  Preview from the same editor content.
                </Text>
              )}
            </Stack>
          </Card>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Stack gap="sm">
          <Text fw={700}>Section 3: Validation Rules & Audit</Text>
          <List size="sm" spacing={6}>
            <List.Item>Unique Version Rule: On create, Consent Version must be unique within the selected User Type.</List.Item>
            <List.Item>Single Active Rule: Only one Active consent is allowed for each User Type (Agent, Sub-agent, End-user).</List.Item>
            <List.Item>
              Activation Behavior: If Status is set to Active and another Active consent exists for the same User Type,
              system auto-deactivates the previous one after confirmation.
            </List.Item>
          </List>
          <Group justify="space-between">
            <Text c="dimmed">Created By</Text>
            <Text>System Label</Text>
          </Group>
          <Group justify="space-between">
            <Text c="dimmed">Last Modified</Text>
            <Text>Timestamp</Text>
          </Group>
        </Stack>
      </Card>

      <Card withBorder radius="md" p="md">
        <Group justify="flex-end">
          <Button variant="default">Cancel</Button>
          <Button>Save Consent</Button>
        </Group>
      </Card>
    </Stack>
  )
}

export default Page
