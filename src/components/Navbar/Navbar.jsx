import styles from './navbar.module.scss';

const Navbar = () => {
    return (
        <div className={styles.navbar_container}>
            <div>HOME</div>
            <div>PUZZLES</div>
            <div>ADD</div>
            <div>MESSAGES</div>
            <div>PROFILE</div>
        </div>
    )
}

export default Navbar;