import { Story } from '@storybook/react';

import DownloadAgreementModal, { DownloadAgreementModalProps } from './DownloadAgreementModal';

export default { title: 'components/DownloadAgreementModal' };

export const Default: Story<DownloadAgreementModalProps> = (args) => <DownloadAgreementModal {...args} />;

Default.args = {
  title: 'Download Agreement',
  terms:
    'All materials on this site are for personal or editorial use only.The use of these materials for advertising, marketing or any other commercial purpose is prohibited.To download these materials, you must agree to abide by these terms.',
  label: 'I have read and accept the terms of the Download Agreement',
  cta: {
    title: 'download',
    href: 'https://google.com'
  },
  closeLabel: 'close modal',
  onClose: () => console.log('close')
};

Default.argTypes = {};
