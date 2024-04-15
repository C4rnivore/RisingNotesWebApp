import VerticalVideoPreview from "./VerticalVideoPreview";
import './Blog.css';

function Blog(params) {
    return (
        <div className="blog">
            <VerticalVideoPreview/>
            <VerticalVideoPreview/>
            <VerticalVideoPreview/>
            <VerticalVideoPreview/>
            <VerticalVideoPreview/>
            <VerticalVideoPreview/>
        </div>
    )
}

export default Blog;