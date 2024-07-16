import styles from './ListTimer.module.scss';
import {useSelector} from "react-redux";
import {RootState} from "../store";

const ListTImer = () => {
    const listTimers = useSelector((state: RootState) => state.timerStore.listTimers)

    return (
        <div className={styles.list}>
            {
                listTimers.map((listTimer) => (
                    <div>
                        <h1>{listTimer.title}</h1>
                        <h2>{listTimer.time}</h2>
                    </div>
                ))
            }

        </div>
    )
}

export default ListTImer;