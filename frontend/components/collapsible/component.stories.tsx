import { Story } from '@storybook/react/types-6-0';
import Collapsible from './component';
import { CollapsibleProps } from './types';

export default {
  title: 'Components/Collapsible',
  component: Collapsible,
};

const Template: Story<CollapsibleProps> = ({ children, ...args }: CollapsibleProps) => (
  <Collapsible {...args}>{children}</Collapsible>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Collapsible title',
  children: <div>Example content</div>,
  disabled: false,
};
