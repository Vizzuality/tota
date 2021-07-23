import { Story } from '@storybook/react/types-6-0';
import Select from './component';
import type { SelectProps } from './types';

export default {
  title: 'Components/Forms/Select',
  component: Select,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: ['dark', 'light'],
      },
    },
    state: {
      control: {
        type: 'select',
        options: ['valid', 'error', 'none'],
      },
    },
    onSelect: {
      table: {
        disable: true,
      },
    },
    initialValues: {
      table: {
        disable: true,
      },
    },
  },
};

const Template: Story<SelectProps> = (args) => (
  <div className="relative">
    <Select {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  theme: 'dark',
  size: 'base',
  maxHeight: 300,
  status: 'none',
  prefix: '',
  placeholder: 'Select Region',
  options: [
    { label: 'Cariboo Chilcotin Coast', value: 'v-1' },
    { label: 'Kootenay Rockies', value: 'v-2' },
    { label: 'Northern BC', value: 'v-3', disabled: true },
  ],
  initialSelected: ['v-1'],
  disabled: false,
  multiple: false,
  searchable: false,
  clearSelectionActive: false,
  clearSelectionLabel: 'Clear Selection',
  batchSelectionActive: false,
  batchSelectionLabel: 'Select all',
  onChange: (option) => console.info(option),
};
