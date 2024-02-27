/* eslint-disable @typescript-eslint/no-explicit-any */
import useSettings from '../../hooks/useSettings';
import MatxSuspenses from '../MatxSuspense';
import { MatxLayouts } from './index';

const MatxLayout = (props: any) => {
  const { settings }: any = useSettings();
  const Layout = MatxLayouts[settings.activeLayout];

  return (
    <MatxSuspenses>
      <Layout {...props} />
    </MatxSuspenses>
  );
};

export default MatxLayout;
