function PostCard(props) {

    const post = props.post

    return (
        <div key={post.id}>
            <div>
            {post.title.rendered}
            </div>
        </div>
    )
}

export default PostCard