import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'


const RoutingComponent = props => {
	// log history events
	useEffect(() => {
		props.history.listen((location, action) => {
			console.log(
				` ---> The current URL is ${location.pathname}${location.search}${location.hash}`
			)
			console.log(` ---> The last navigation action was ${action}`)
		})
	}, [props.history])

	// log location/history changes
	useEffect(() => {
		console.log('  ==> location changed',
			props.location.pathname,
			props.history.action)
	}, [props.location, props.history])

	return (<div>
		<Switch>
			<Route exact={true} path='/' component={()=> {
				return (<div>
					<h1>Test scenarios</h1>
					<h2>Problem Path</h2>
					<div>
						<button onClick={() => {
							props.history.replace('/extlogin')
						}}>Login (External Redirect - history.replace)</button>
					</div>
					<h2>Happy Paths</h2>
					<div>
						<button onClick={() => {
							props.history.replace('/extloginpush')
						}}>Login (External Redirect - history.push)</button>
					</div>
					<div>
						<button onClick={() => {
							props.history.replace('/login')
						}}>Login (Internal "Redirect")</button>
					</div>
				</div>)
			}}/>

			<Route exact={true} path='/login' component={()=> {
				console.warn('Re-directing to internal link in 3 seconds...')
				setTimeout(() => {
					console.warn('window.location.href to /reentry')
					window.location.href = "http://localhost:3000/reentry";
				}, 3000)

				return (<div>Re-directing to external link in 3 seconds...</div>)
			}}/>
			<Route exact={true} path='/extlogin' component={()=> {
				console.warn('Re-directing to external link in 3 seconds...')
				setTimeout(() => {
					console.warn('calling out to tinyurl to redirect back to us')
					// https://tinyurl.com/y5naevvn redirects back to http://localhost:3000/reentry
					window.location.href = "https://tinyurl.com/y5naevvn";
				}, 3000)

				return (<div>Re-directing to external link in 3 seconds...</div>)
			}}/>
			<Route exact={true} path='/extloginpush' component={()=> {
				console.warn('Re-directing to external PUSH link in 3 seconds...')
				setTimeout(() => {
					console.warn('calling out to tinyurl to redirect back to us')
					// https://tinyurl.com/y5vzdfqt redirects back to http://localhost:3000/reentrypush
					window.location.href = "https://tinyurl.com/y5vzdfqt";
				}, 3000)

				return (<div>Re-directing to external PUSH link in 3 seconds...</div>)
			}}/>

			<Route exact={true} path='/reentry' component={()=> {
				console.warn('reentry loaded')
				console.warn(' --> history.replace to /reentry2 in 1.5 seconds...')
				setTimeout(() => {
					props.history.replace('/reentry2')
				}, 1500)
				return (<div>history.replace to /reentry2 in 1.5 seconds...</div>)
				// return (<Redirect to='/reentry2' />)
			}}/>

			<Route exact={true} path='/reentrypush' component={()=> {
				console.warn('reentry loaded')
				console.warn(' --> history.replace to /reentry2 in 1.5 seconds...')
				setTimeout(() => {
					props.history.replace('/reentrypush2')
				}, 1500)
				return (<div>history.replace to /reentry2 in 1.5 seconds...</div>)
				// return (<Redirect to='/reentry2' />)
			}}/>

			<Route exact={true} path='/reentry2' component={()=> {
				console.warn('reentry2 loaded')
				console.warn(' --> history.replace to /reentry3 in 1.5 seconds...')
				setTimeout(() => {
					props.history.replace('/reentry3')
				}, 1500)
				return (<div>history.replace to /reentry3 in 1.5 seconds...</div>)
				// return (<Redirect to='/reentry3' />)
			}}/>

			<Route exact={true} path='/reentrypush2' component={()=> {
				console.warn('reentry2 loaded')
				console.warn(' --> history.push to /reentry3 in 1.5 seconds...')
				setTimeout(() => {
					props.history.push('/reentry3')
				}, 1500)
				return (<div>history.push to /reentry3 in 1.5 seconds...</div>)
				// return (<Redirect to='/reentry3' />)
			}}/>

			<Route exact={true} path='/reentry3' component={()=> {
				console.warn('reentry3 loaded')
				return (
					<div>
						<div>Re-entered</div>
						<div>
							<button onClick={() => {
								console.warn('reload')
								console.warn('-------------------------------')
								window.location.reload()
							}}>Reload</button>
						</div>
						<div>
							<button onClick={() => {
								console.warn('history.replace')
								console.warn('-------------------------------')
								props.history.replace('/')
							}}>Start Over (history.replace)</button>
						</div>
						<div>
							<button onClick={() => {
								console.warn('history.push')
								console.warn('-------------------------------')
								props.history.push('/')
							}}>Start Over (history.push)</button>
						</div>
						<div>
							<button onClick={() => {
								console.warn('location.href')
								window.location.href = '/'
							}}>Start Over (location.href)</button>
						</div>
					</div>)
			}}/>
		</Switch>
	</div>)
}

const Main = withRouter(RoutingComponent)

const App = () => {
	return (<Router>
		<Main />
	</Router>)
}

ReactDOM.render(<App />, document.getElementById('root'))
