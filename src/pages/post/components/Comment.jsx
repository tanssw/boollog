import dayjs from 'dayjs'

function Comment(props) {

    let comment = props.comment

    const AuthorName = () => {
        if (comment.author_name) return <a href={comment.author_url} target="_blank" className="hover:underline">{comment.author_name}</a>
        return 'Anonymous'
    }

    return (
        <div id={comment.id} className="border dark:border-gray-600 p-8 rounded-lg my-4">
            <div className="flex items-center mb-8">
                <img src={comment.author_avatar_urls['96']} alt="Comment's Profile Image" className="rounded-full w-16 h-16 mr-6" />
                <div>
                    <div className="font-bold text-xl dark:text-blue-300 mb-1">
                        <AuthorName />
                    </div>
                    <div className="dark:text-gray-400 font-light">
                        {dayjs(comment.date).format('DD MMMM YYYY — hh:mm')}
                    </div>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{__html: comment.content.rendered}} className="prose dark:prose-invert prose-img:rounded-lg max-w-none"></div>
        </div>
    )
}

export default Comment