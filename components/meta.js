import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="theme-color" content="#000" />
            <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
            <meta name="description" content={`Automation test cases for Mattermost Hackfest 2020.`} />
        </Head>
    );
}
