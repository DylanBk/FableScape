import Header from "../layout/Header";
import Book from "../layout/Book";
import Footer from "../layout/Footer";

export default function Story() {
    return (
        <div
            id="story-page"
            className="min-h-screen flex flex-col">
            <Header />
            <Book />
            <Footer />
        </div>
    )
}