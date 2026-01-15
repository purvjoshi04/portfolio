export default function FooterBar() {
    const year = new Date().getFullYear()
    return (
        <div className=" bottom-0 w-full z-50 bg-neutral-900 ">
            <div className="flex font-body text-lg justify-around items-center py-3 border border-t-neutral-800 border-b-0 border-l-0 border-r-0  ">
                <div className="flex gap-2">
                    <h1 className="text-neutral-500"> Copyright ©</h1>
                    {year} Purv Joshi
                </div>
            </div>
        </div>
    );
}