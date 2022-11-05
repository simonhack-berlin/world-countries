import { Link } from "react-router-dom";

import "./Button.css";

function Button(props) {

    if (props.link) {
        return (
            <div className="btn-container">
                <Link className="btn" to={props.link}>
                    {props.children}
                </Link>
            </div>
        )
    } else {
        return (
            <div className="btn-container">
                <button className="btn" onClick={props.onClick}>{props.children}</button>
            </div>
        )
    }
}

export default Button;
