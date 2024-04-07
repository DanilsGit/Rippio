import { CategoriesContent } from "./CategoriesContent";
import items from '../../utilities/categories.json'

export function Categories(){
    return (
        <section className="Categories firstSection-child">
        <header className="Categories-header">
            <h2>¿Aún no te decides?</h2>
            <p>Explora las categorías más populares</p>
        </header>
            <CategoriesContent items={items} />
    </section>
    );
}