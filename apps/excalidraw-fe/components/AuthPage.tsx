"use client";

export function AuthPage({isSignin}: {
    isSignin: boolean
}) {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-6 m-2 bg-white rounded">
            <div className="p-2 text-gray-950">
                <input type="text" placeholder="Username"></input>
            </div>
            <div className="p-2 text-gray-950">
                <input type="password" placeholder="Password"></input>
            </div>

            <div className="pt-2 text-black">
                <button className="rounded p-2" onClick={() => {

                }}>{isSignin ? "Sign in" : "Sign up"}</button>
            </div>
        </div>
    </div>

}