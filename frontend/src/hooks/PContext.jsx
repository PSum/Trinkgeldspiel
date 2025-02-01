import { useContext } from "react";
import { AppContext } from "../App";

export default function Context ( value ) {
        return useContext(AppContext)[value]
}