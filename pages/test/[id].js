import {useRouter} from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import PostBody from '../../components/post-body';
import PostHeader from '../../components/post-header';
import Layout from '../../components/layout';
import Head from 'next/head';

import useSWR from 'swr';

const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log('fetcher data:', data);

    if (res.status !== 200) {
        throw new Error(data.message);
    }
    return data;
};

const generateContent = (steps) => {
    let content = '';

    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const num = steps.length > 1 ? i + 1 : '';

        const re = /\/"/gi;
        const {inline} = step;

        if (inline?.description) {
            content += `<h3>Steps ${num ? ' #' + num : ''}</h3>`;
            content += inline.description.replace(re, '"');
        }

        if (inline?.testData) {
            content += '<h3>Test Data</h3>';
            content += inline.testData.replace(re, '"');
        }

        if (inline?.expectedResult) {
            content += '<h3>Expected</h3>';
            content += inline.expectedResult.replace(re, '"');
        }

        content += '<hr>';
    }

    return content;
};

export default function Test({preview}) {
    const {query} = useRouter();
    const {data, error} = useSWR(() => query.id && `/api/tests/${query.id}`, fetcher);

    if (error) return <div>{error.message}</div>;
    if (!data) return <div>Loading...</div>;

    if (error) {
        return <ErrorPage statusCode={404} />;
    }

    const {key, name, steps} = data;

    const content = generateContent(steps);

    return (
        <Layout preview={preview}>
            <Container>
                <>
                    <article className="mb-32">
                        <Head>
                            <title>{`${key} ${name}`} | Mattermost Hackfest 2020: Automated UI Testing</title>
                        </Head>
                        <PostHeader title={`${key} ${name}`} />
                        <PostBody content={content} />
                    </article>
                </>
            </Container>
        </Layout>
    );
}
