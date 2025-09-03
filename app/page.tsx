import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <div>Home Page</div>

            <div>
                <Link href="/recipes">Go to recipes</Link>
            </div>
        </div>
    );
}
