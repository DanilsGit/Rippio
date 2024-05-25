/* eslint-disable react/prop-types */
export function Register({ userMode, text, setUserRegister, handleSubmitRegister, errors, handleRegisterClick, handleLoginClick, setUserLogin, handleSubmitLogin }) {
    return (
        <section className={userMode ? "register-login-page-content" : "register-login-page-content register-login-page-content-to-Restaurant"}>
            <section className="loginPage-content">
                <form
                    onSubmit={handleSubmitLogin}
                    className={`loginPage-form ${userMode ? 'user-mode' : 'non-user-mode'}`}>
                    <h2 className="loginPage-form-h2">{text.login.title_login}</h2>
                    <div className={`loginPage-form-input ${userMode ? 'user-mode' : 'non-user-mode'}`}>
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Correo electrónico"
                            onChange={(e) => setUserLogin((user) => ({
                                ...user,
                                email: e.target.value
                            }))}
                        />
                    </div>
                    <div className="loginPage-form-input">
                        <i className="fas fa-lock"></i>
                        <input type="password" placeholder="Contraseña"
                            onChange={(e) => setUserLogin((user) => ({
                                ...user,
                                password: e.target.value
                            }))} />
                    </div>
                    {
                        errors
                            ? <p className="incorrect">{errors.message}</p>
                            : null
                    }
                    <input
                        type="submit"
                        value={text.login.button_login}
                        className={`loginPage-form-button ${userMode ? 'user-mode' : 'non-user-mode'}`}
                    />
                    <p className="info">
                        {text.login.title_register}{" "}
                        <a
                            href="#"
                            id="registerPage-button2"
                            className="registerPage-button2"
                            onClick={handleRegisterClick}
                        >
                            {text.login.button_register}
                        </a>
                    </p>
                </form>
            </section>

            <section className="registerPage-content">
                <form action="" className={`registerPage-form ${userMode ? 'user-mode' : 'non-user-mode'}`}
                    onSubmit={handleSubmitRegister}
                >
                    <h2 className="registerPage-form-h2"> {text.register.title_register}</h2>

                    <div className={`registerPage-form-input ${userMode ? 'user-mode' : 'non-user-mode'}`}>
                        <input required type="text" placeholder={userMode ? "Nombre" : "Nombre del restaurante"}
                        id='registerInputFirstName'
                            onChange={(e) => setUserRegister((user) => ({
                                ...user,
                                nombre: e.target.value
                            }))}
                        />
                    </div>

                    {
                        userMode
                            ?
                            <div className="registerPage-form-input">
                                <input required type="text" placeholder="Apellido" id='registerInputLastName'
                                    onChange={(e) => setUserRegister((user) => ({
                                        ...user,
                                        apellido: e.target.value
                                    }))}
                                />
                            </div>
                            : null
                    }

                    <div className="registerPage-form-input">
                        <input required type="text" placeholder={userMode ? "Identificación" : "NIT - Documento"}
                        id='registerInputId'
                            onChange={(e) => setUserRegister((user) => ({
                                ...user,
                                identificacion: e.target.value
                            }))}
                        />
                    </div>

                    <div className="registerPage-form-input">
                        <input required type="text" placeholder="Teléfono" id='registerInputTel'
                            onChange={(e) => setUserRegister((user) => ({
                                ...user,
                                telefono: e.target.value
                            }))}
                        />
                    </div>

                    <div className="registerPage-form-input">
                        <input required type="email" placeholder="Correo electrónico" id='registerInputEmail'
                            onChange={(e) => setUserRegister((user) => ({
                                ...user,
                                email: e.target.value
                            }))}
                        />
                    </div>

                    <div className="registerPage-form-input">
                        <input required type="password" placeholder="Contraseña" id='registerInputPass'
                            onChange={(e) => setUserRegister((user) => ({
                                ...user,
                                password: e.target.value
                            }))}
                        />
                    </div>
                    {
                        errors
                            ? <p className="incorrect">{errors.message}</p>
                            : null
                    }
                    <input
                        type="submit"
                        value={text.register.button_register}
                        className={`registerPage-form-button ${userMode ? 'user-mode' : 'non-user-mode'}`}
                    />
                    <p className="info">
                        {text.register.title_login}{" "}
                        <a
                            href="#"
                            id="loginPage-button2"
                            className="loginPage-button2"
                            onClick={handleLoginClick}
                        >
                            {text.register.button_login}
                        </a>
                    </p>
                </form>
            </section>

            <div className={`panels-content ${userMode ? 'user-mode' : 'non-user-mode'}`}>
                <div className="panel left-panel">
                    <div className="left-panel-content">
                        <h3>{text.register.title_login}</h3>
                        <p>
                            {text.register.p_login}
                        </p>
                        <img className='right-panel-image' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/LoginPage%2FDonutAnimation.png?alt=media&token=cd4285ad-cf40-42f4-a68e-eede58de09ec'></img>
                        <button
                            id="loginPage-button"
                            className="loginPage-button"
                            onClick={handleLoginClick}
                        >
                            {text.register.button_login}
                        </button>
                    </div>
                </div>

                <div className="panel right-panel">
                    <div className="right-panel-content">
                        <h3>{text.login.title_register}</h3>
                        <p>
                            {text.login.p_register}
                        </p>
                        <img className='right-panel-image' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/LoginPage%2FSushiAnimation.png?alt=media&token=6712c17a-aa9c-4a54-92b8-7906fc053674'></img>
                        <button
                            id="registerPage-button"
                            className="registerPage-button"
                            onClick={handleRegisterClick}
                        >
                            {text.login.button_register}
                        </button>

                    </div>
                </div>
            </div>
        </section>
    )
}