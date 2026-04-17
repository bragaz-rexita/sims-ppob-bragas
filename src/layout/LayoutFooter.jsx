import React from 'react'
import { Layout, Typography } from 'antd'

const {Text} = Typography;

const { Footer } = Layout;
const LayoutFooter = () => {
    return (
        <Footer
            style={{
                backgroundColor: '#ff4a4a',
                padding: '15px 30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height:40
            }}
        >
            {/* LEFT */}
            <Text strong style={{ color: '#fff' }}>
                © 2026 SIMS PPOB
            </Text>

            {/* RIGHT */}
            <Text strong style={{ color: '#fff' }}>
                Bragas Rexita Ecos Fernanda S.Tr.Kom.
            </Text>
        </Footer>
    )
}

export default LayoutFooter
