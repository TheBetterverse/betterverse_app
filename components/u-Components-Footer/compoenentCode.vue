<template>
  <footer class="bv__footer bv__globals__px">
    <div class="bv__footer__titlesection" style="grid-area: title">
      <!-- <h1><b>Betterverse</b></h1> -->
      <img
        src="https://uploads-ssl.webflow.com/62554ccc10f0e2be91a8c9fc/633f4b025d49a5b6b0809557_Betterverse-logo-large.svg"
        loading="lazy"
        alt=""
        style="max-width: 254px; margin-bottom: 0.75rem"
      />
      <p>
        Brought to you with
        <u-Icons-Heart fill="#FFA6AF" color="black"></u-Icons-Heart> from the
        Betterverse team.
      </p>
    </div>

    <div class="bv__footer__linksection" style="grid-area: linksection">
      <div class="bv__footer__linklist" style="grid-area: learn">
        <p>Learn more</p>
        <div>
          <p><a href="https://www.betterverse.app/#about">About</a></p>
          <p><a href="https://www.betterverse.app/team">Team</a></p>
          <p><a href="https://www.betterverse.app/roadmap">Roadmap</a></p>
          <p><a href="https://www.betterverse.app/#metaverse">Metaverse</a></p>
        </div>
      </div>

      <div class="bv__footer__linklist" style="grid-area: follow">
        <p>Follow Us</p>
        <div class="bv__footer__followlinks">
          <p>
            <a href="https://discord.com/invite/BxRfSBgB9n"
              ><u-Icons-Discord></u-Icons-Discord>Discord</a
            >
          </p>
          <p>
            <a href="https://twitter.com/betterverse_app"
              ><u-Icons-Twitter></u-Icons-Twitter>Twitter</a
            >
          </p>
          <p>
            <a href="https://www.instagram.com/betterverse.app/"
              ><u-Icons-Instagram></u-Icons-Instagram>Instagram</a
            >
          </p>
        </div>
      </div>

      <div class="bv__footer__linklist" style="grid-area: donate">
        <p>Give</p>
        <div>
          <p>
            <a href="#" @click="$setCurrentSubTab('-Myvhn-hQMIUPkvnAyCQ')">Projects</a>
          </p>
        </div>
      </div>

      <div class="bv__footer__linklist" style="grid-area: legal">
        <p>Legal</p>
        <div>
          <p><a href="https://www.betterverse.app/legal">FAQs</a></p>
          <p>
            <a href="https://www.betterverse.app/legal">Cookies & Privacy</a>
          </p>
          <p>
            <a href="https://www.betterverse.app/legal/#terms-of-use"
              >Terms of use</a
            >
          </p>
        </div>
      </div>

      <div class="bv__footer__linklist" style="grid-area: reach">
        <p>Reach Out</p>
        <div>
          <p><a href="https://www.betteverse.app/team/#contact">Contact</a></p>
        </div>
      </div>
    </div>

    <div class="bv__footer__bvinfosection" style="grid-area: bvinfo">
      <p>© 2022 Betterverse</p>
      <p>
        The "Betterverse" name and logomark are registered trademarks of
        Betterverse Ltd. Company no. 13286094
      </p>
    </div>

    <div class="bv__footer__appinfosection" style="grid-area: appinfo">
      <p>
        Our platform is currently in Alpha v1.0<br />so please bare
        with us or
        <a href="mailto: help@betterverse.app"><u>report your issues here</u></a
        >.
      </p>
    </div>
  </footer>
</template>

<script>
module.exports = {
  components: {
    uIconsHeart: $getCustomComponent('u-Icons-Heart'),
    uIconsDiscord: $getCustomComponent('u-Icons-Discord'),
    uIconsTwitter: $getCustomComponent('u-Icons-Twitter'),
    uIconsInstagram: $getCustomComponent('u-Icons-Instagram')
  }
}
</script>

<style>
.bv__footer {
  position: static;
  width: 100%;
  min-height: 57vh;
  z-index: 100;
  bottom: 0;

  display: grid;
  gap: 30px;
  align-items: center;
  justify-content: space-between;
  grid-template-areas: 'title' 'linksection' 'bvinfo' 'appinfo';

  padding-top: 60px;
  padding-bottom: 60px;

  color: #000;
  background-color: var(--bg-primary);

  border-top: 1px solid black;
}

.bv__footer__titlesection {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bv__footer__linksection {
  display: grid;
  grid-template-areas: 'learn follow' 'legal donate' 'reach reach';
  justify-content: start;
  gap: 30px;
  width: 100%;
  margin-bottom: 22px;
  margin-top: 22px;
}

.bv__footer__linklist {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: max-content;
}

.bv__footer__linklist > p {
  font-weight: 800;
  font-size: 16px;
  line-height: 23px;
}

.bv__footer__linklist > div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.bv__footer__linklist > div > p {
  font-size: 14px;
  line-height: 23px;
}

.bv__footer__linklist > div > p > a {
  font-style: normal;
  font-weight: 500;
  text-decoration: none;
}

.bv__footer__linklist > div > p > a:hover {
  color: #777671;
}

.bv__footer__followlinks > p > a {
  display: flex;
  align-items: center;
  gap: 9px;
}

.bv__footer__followlinks > p > a > span {
  display: flex;
  align-items: center;
}

.bv__footer__bvinfosection {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 100%;
}

.bv__footer__appinfosection {
  justify-content: start;
}

@media screen and (min-width: 1080px) {
  .bv__footer {
    grid-template-areas: 'title linksection' 'bvinfo appinfo';
    align-items: flex-start;
  }

  .bv__footer__titlesection {
    height: 100%;
    justify-content: flex-start;
    gap: 0px;
  }

  .bv__footer__linklist {
    width: 128px;
  }

  .bv__footer__linksection {
    margin-bottom: 0;
    margin-top: 0;
    grid-gap: 30px;

    grid-template-areas: 'learn donate reach follow legal';
    grid-template-columns: repeat(auto-fit, 1fr);
    justify-content: end;
  }

  .bv__footer__bvinfosection {
    height: 100%;
    justify-content: flex-end;
    gap: 0;
    width: 100%;
  }

  .bv__footer__appinfosection {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .bv__footer__bvinfosection {
    max-width: 60%;
    gap: 20px;
  }
}
</style>
