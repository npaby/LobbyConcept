import { useCookies } from 'react-cookie';

export default function TestPage() {
    const [cookies] = useCookies();

    return (
        <div>
            <h1>My Cookies (Debug)</h1>
            <pre>{cookies.accessToken}</pre>
            <pre>{cookies.refreshToken}</pre>
        </div>
    );
}
