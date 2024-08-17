import {Link} from "react-router-dom";
import '../Navigate/Navigate.css';
const Navigate = ()=>{

    return(
        <div className="cont-nav">
            <nav>
                <Link to='/category/pcgamer'>PC Gamer</Link>
            </nav>
            <nav>
                <Link to='/category/notebookgamer'>Notebook Gamer</Link>
            </nav>
            <nav>
                <Link to='/category/consolas'>Consolas</Link>
            </nav>
            <nav>
                <Link to='/category/mouse'>Mouse</Link>
            </nav>
            <nav>
                <Link to='/category/teclado'>Teclado</Link>
            </nav>
            <nav>
                <Link to='/category/monitor'>Monitor</Link>
            </nav>
        </div>
    )
}

export default Navigate;