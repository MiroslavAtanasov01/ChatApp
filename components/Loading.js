import { Circle } from 'better-react-spinkit'

function Loading() {
    return (
        <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
            <div>
                <img
                    src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=399&h=399"
                    alt=""
                    style={{ marginBottom: 10 }}
                    height={150}
                />
                <Circle color='#b257e6' size={60} />
            </div>
        </center>
    )
}

export default Loading
