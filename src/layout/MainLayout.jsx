import { Layout } from 'antd';
import LayoutHeader from './LayoutHeader';
import LayoutFooter from './LayoutFooter';

const { Content } = Layout;

const MainLayout = ({ children }) => {
    return (
        <Layout style={{ height: '100vh' }}>
            <Layout style={{ overflow: 'auto' }}>
                <LayoutHeader />
                <Content
                    style={{
                        margin: '10px 16px 0',
                        flex: '1 0 auto',
                    }}
                >
                    {children}
                </Content>
                <LayoutFooter/>
            </Layout>
        </Layout>
    );
};
export default MainLayout;