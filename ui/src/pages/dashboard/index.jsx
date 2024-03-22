import localStyles from './dashboard.module.scss';

function Dashboard() {
    return (
        <div className={localStyles.page}>
            <h1>Home</h1>
            <p>
                Home, sweet home. It's wonderful, ain't it?
            </p>
        </div>
    );
}

export default Dashboard;
