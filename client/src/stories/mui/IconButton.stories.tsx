import { Meta, StoryObj } from '@storybook/react'
import { IconButton, IconButtonProps } from '@mui/material'
import { Home, Message, PermContactCalendar } from '@mui/icons-material'

const meta = {
  title: 'Material UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'error',
        'success',
        'warning',
        'info',
      ],
      description: 'Color of the IconButton',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the IconButton',
    },
    disabled: {
      control: 'boolean',
      description: 'Is the IconButton disabled',
    },
    edge: {
      control: 'select',
      options: ['start', 'end', false],
      description:
        'If given, uses a negative margin to counteract the padding on one side',
    },
  },
} satisfies Meta<IconButtonProps>

export default meta
type Story = StoryObj<typeof meta>

export const HomeButton: Story = {
  args: {
    size: 'medium',
    children: <Home />,
  },
}

export const MessageButton: Story = {
  args: {
    size: 'medium',
    children: <Message />,
  },
}

export const ContactsButton: Story = {
  args: {
    size: 'medium',
    children: <PermContactCalendar />,
  },
}
