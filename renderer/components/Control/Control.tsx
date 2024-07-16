import styles from './Control.module.scss';
import Image from "next/image";
import { useEffect, useState } from "react";
import {useSnackbar} from "notistack";
import {useDispatch} from "react-redux";
import {addList} from "../store/timer.slice";

const Control = () => {
    const [isPlay, setIsPlay] = useState(false);
    const [milliseconds, setMilliseconds] = useState(0);
    const [title, setTitle] = useState<string>('')
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()

    function changePlay() {
        setIsPlay(state => !state);
        if (isPlay) {
            saveTimer()
            setIsPlay(false)
        }
    }

    function saveTimer() {
        if (isPlay) {
            if (title) {
                dispatch(addList({
                    title: title,
                    time: formatTime(milliseconds),
                }))
                setMilliseconds(0);
            } else {
                setMilliseconds(0);
                enqueueSnackbar('Введите название таймера!', {variant: 'error'});
            }
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const seconds = Math.floor((time / 1000) % 60);
        const msecs = Math.floor((time % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${msecs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        let intervalId;

        if (isPlay) {
            if(title) {
                intervalId = setInterval(() => {
                    setMilliseconds(prevMilliseconds => prevMilliseconds + 10);
                }, 10);
            } else {
                enqueueSnackbar('Введите название таймера!', {variant: 'error'});
            }
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isPlay]);

    return (
        <div className={styles.control}>
            <input type="text" placeholder="Название метки" value={title} onChange={(e) => {setTitle(e.target.value)}} spellCheck={false} maxLength={23} />
            <div>
                <input type="text" disabled value={formatTime(milliseconds)} />
                <button onClick={changePlay}>
                    <Image src="/assets/play.svg" height={40} width={40} alt="svg" draggable={false} />
                </button>
            </div>
        </div>
    );
};

export default Control;