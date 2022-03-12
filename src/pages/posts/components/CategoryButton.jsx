import { Link } from 'react-router-dom'

function CategoryButton(props) {

    let {category, onSelect} = props

    let staticClasses = 'hover:bg-gray-700 duration-100 mx-2 px-6 py-2 rounded-full font-light text-sm cursor-pointer'
    let backgroundClass = category.active ? 'bg-gray-600' : 'bg-gray-800'
    let classes = `${backgroundClass} ${staticClasses}`

    return (
        <Link onClick={() => {onSelect(category)}} to={`/posts?category=${category.slug}`} className={classes}>
            {category.name}
        </Link>
    )
}

export default CategoryButton