import {Link} from "react-router-dom";
import '../Navigate/Navigate.css';
const Navigate = ()=>{




    return(
        <div className="cont-nav">
            <nav>
                <Link to='*'>PC GAMER</Link>
            </nav>
            <nav>
                <Link to='*'>NOTEBOOK GAMER</Link>
            </nav>
            <nav>
                <Link to='*'>Consolas</Link>
            </nav>
            <nav>
                <Link to='*'>Mouse</Link>
            </nav>
            <nav>
                <Link to='*'>Teclado</Link>
            </nav>
            <nav>
                <Link to=''>Monitor</Link>
            </nav>
        </div>
    )
}

export default Navigate;