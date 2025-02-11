<template>
	<nav>
		<router-link to="/">Home</router-link> |
		<router-link to="/about">About</router-link>
	</nav>
	<router-view />
</template>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: rgb(44 62 80);
		text-align: center;
	}

	nav {
		padding: 30px;
	}

	nav a {
		font-weight: bold;
		color: rgb(44 62 80);
	}

	nav a.router-link-exact-active {
		color: rgb(66 185 131);
	}
</style>
