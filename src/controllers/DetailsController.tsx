import { RootState } from "../models/redux/store";
import DrawerComponent from "../views/DrawerComponent"
import DetailsView from "../views/details/DetailsView"
import { useSelector } from "react-redux/es/hooks/useSelector"

const DetailsController = () => {
    const details = useSelector((state: RootState) => state.details.value);
    return (
        <>
            <DrawerComponent />
            <DetailsView details={details} />
        </>
    )
}
export default DetailsController
