const Header = () => {
    return (
        <header>
            <div className="flex items-center justify-between bg-gray-900 p-3 text-amber-200">
                <h1 className="text-3xl">Trillo</h1>
                <button className="bg-amber-200 p-1.5 rounded-lg text-gray-900">Create project</button>
            </div>
        </header>
    );
}

export default Header;