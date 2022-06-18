<script lang="ts">
	import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

	enum GoogleImage {
		DARK_NORMAL = 'btn_google_signin_dark_normal_web.png',
		DARK_HOVER = 'btn_google_signin_dark_focus_web.png',
		DARK_CLICKED = 'btn_google_signin_dark_pressed_web.png'
	}

	let signInImageSrc = `/google_signin_buttons/web/1x/${GoogleImage.DARK_NORMAL}`;

	async function loginWithGoogle() {
		setImage(GoogleImage.DARK_CLICKED);
		try {
			await signInWithPopup(getAuth(), new GoogleAuthProvider());
		} catch (e) {
			console.log(e);
		}
	}

	/**
	 * Updates the Image src attribute
	 * @param img
	 */
	function setImage(img: GoogleImage) {
		signInImageSrc = signInImageSrc.substring(0, signInImageSrc.lastIndexOf('/') + 1) + img;
	}
</script>

<div>
	<h1>Login with Google</h1>
	<img
		on:click={loginWithGoogle}
		on:mouseenter={() => setImage(GoogleImage.DARK_HOVER)}
		on:mouseleave={() => setImage(GoogleImage.DARK_NORMAL)}
		src={signInImageSrc}
		alt="Sign in with Google"
	/>
</div>
