import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const SmartAttendance = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const [isPresent, setIsPresent] = useState(true); // toggle manually for now
    const [recognizedStudents, setRecognizedStudents] = useState([
        { id: '101', name: 'John Doe', status: 'Present' },
        { id: '102', name: 'Jane Smith', status: 'Present' },
        { id: '101', name: 'John Doe', status: 'Present' },
        { id: '102', name: 'Jane Smith', status: 'Present' },
        { id: '101', name: 'John Doe', status: 'Present' },
        { id: '102', name: 'Jane Smith', status: 'Present' },
        { id: '101', name: 'John Doe', status: 'Present' },
        { id: '102', name: 'Jane Smith', status: 'Present' },
        { id: '101', name: 'John Doe', status: 'Present' },
        { id: '102', name: 'Jane Smith', status: 'Present' },
    ]);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-screen w-screen bg-gradient-to-br from-black via-[#092f2f] to-[#6195d6] flex items-center justify-center px-4 py-6 font-sans">
        <div className="w-full max-w-7xl bg-[#0d0d1f]/80 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_30px_rgba(255,0,255,0.3)] border border-fuchsia-800/30 flex gap-8">
    
            {/* Left Side - Camera + Status */}
            <div className="flex flex-col items-center flex-1">
                <h1 className="text-3xl font-semibold text-fuchsia-400 mb-8 flex items-center tracking-wide">
                    <span role="img" aria-label="target" className="mr-3"></span> Smart Attendance
                </h1>
    
                <div className="relative w-[640px] h-[480px] rounded-2xl overflow-hidden border border-cyan-400/40 shadow-inner shadow-cyan-500/30">
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        width={640}
                        height={480}
                        screenshotFormat="image/jpeg"
                        className="rounded-xl"
                        videoConstraints={{ facingMode: "user" }}
                    />
                    <canvas
                        ref={canvasRef}
                        width={640}
                        height={480}
                        className="absolute top-0 left-0"
                    />
                </div>
    
                <div className="mt-6 w-[400px] bg-[#1e1e3f]/80 p-4 rounded-xl border border-pink-500/30 text-center shadow-md">
                    <h2 className="text-xl font-medium mb-2 text-white">Student Status</h2>
                    <p className={`text-lg font-semibold ${isPresent ? 'text-lime-400' : 'text-red-500'}`}>
                        {isPresent ? "✅ Present" : "❌ Not Detected"}
                    </p>
                </div>
            </div>
    
            {/* Right Side - Time & Recognized List */}
            <div className="flex flex-col justify-between w-[350px]">
                {/* Time Block */}
                <div className="text-white text-center mb-6">
                    <p className="text-3xl font-semibold">{time.toLocaleTimeString()}</p>
                    <p className="text-sm text-gray-400">{time.toDateString()}</p>
                </div>
    
                {/* Recognized Students */}
                <div className="bg-[#1e1e3f]/80 rounded-xl border border-cyan-400/20 p-5 overflow-y-auto max-h-[600px] shadow-inner shadow-fuchsia-700/20">
                    <h2 className="text-xl font-medium text-fuchsia-400 mb-4 border-b border-pink-500/30 pb-2">Recognized Students</h2>
                    {recognizedStudents.map((student) => (
                        <div
                            key={student.id}
                            className="flex justify-between items-center text-white py-3 px-4 rounded-lg hover:bg-fuchsia-700/30 transition"
                        >
                            <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-xs text-gray-400">ID: {student.id}</p>
                            </div>
                            <span className="text-lime-400 text-sm font-medium">{student.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    

    );
};

export default SmartAttendance;
