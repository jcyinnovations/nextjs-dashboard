'use client';

import { Component, Suspense } from "react";
import { useEffect, useState, useRef } from "react";
import styles from './scanner.module.css';
import clsx from 'clsx';

import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group";

interface CameraFeedPropsInterface {
    sendFile: any
}
  
interface CameraFeedStateInterface {
    availableCameraDevices: CameraDeviceInputInfoInterface[];
    selectCamerasDeviceById: string;
}
 
interface CameraDeviceInputInfoInterface {
    deviceId: string;
    groupId: string;
    kind: string;
    label: string;
}

export default function QRScan({ isActive, facingMode }: { isActive?: boolean, facingMode: string }) {
    const videoPlayer = useRef<HTMLVideoElement>(null);

    //const [videoPlayer, setVideoPlayer] = useState<MediaStream>()
    const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([])
    const [currentCamera, setCurrentCamera] = useState("")
    const [canvas, setCanvas] = useState(null)

    //const camera = useRef<any>(null);

    //Load list of cameras into state
    useEffect( () => {
        navigator.mediaDevices.enumerateDevices().then(
            (devices) => {
                setAvailableCameras(
                    devices.filter((device) => device.kind === 'videoinput')
                )
            }
        )
    }, []);

    //Load the current camera stream
    // useEffect( () => {

    // }, [currentCamera]);

    async function setDevice(deviceId: string) {
        navigator
        .mediaDevices
        .getUserMedia({ video: {deviceId: deviceId} })
        .then( (stream) => {
            console.log(videoPlayer.current);
            if (videoPlayer.current) {
                videoPlayer.current.srcObject = stream;
                setTimeout(() => {
                    if (videoPlayer.current)
                        videoPlayer.current.play();
                }, 500)
            }
        })
        .catch( (err) => {
            console.log("Error setting camera device")
        })

    }

    // const capturePhoto = () => {
    //     const { sendFile } = props;
    //     const context = canvas.getContext('2d');
    //     context.drawImage(videoPlayer, 0, 0, 680, 360);
    //     const dataBase64 = canvas.toDataURL("image/jpeg");
    //     sendFile(dataBase64);
    // }
       
    return (
        <Suspense fallback={<p>...loading</p>}>
            <div className={styles.camera_container}>
                <div className={styles.list_of_available_cameras}>
                    <ToggleGroup type="single" defaultValue="off" onValueChange={(e)=> { setDevice(e)}}>
                        <ToggleGroupItem key="off" value="off" aria-label="off">OFF</ToggleGroupItem>
                        {
                            availableCameras.map( (camera) => {
                                return <ToggleGroupItem key={camera.deviceId} value={camera.deviceId} aria-label={camera.label}>{camera.label}</ToggleGroupItem>
                            })
                        }
                    </ToggleGroup>
                </div>

                <div>
                    <video 
                        ref={videoPlayer} muted autoPlay={true} playsInline={true} ></video>
                </div>

                <button className={styles.capture_photo}>Capture photo</button>

                <div className={styles.stage}>
                    {/* <canvas width="680" height="360" ref={ref => (canvas = ref)} /> */}
                </div>
            </div>
        </Suspense>
    );
}
