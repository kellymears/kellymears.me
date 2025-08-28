import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import Main from './Main'

const Page = async () => <Main posts={allCoreContent(sortPosts(allBlogs))} />

export default Page
