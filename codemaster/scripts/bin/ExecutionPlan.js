this.scrollfunction ExecutionPlan(scroll){
    this.scroll = settings;
    this.plan = Array(scroll.ic).fill(null);

    this.addToken = function(token, position) {
        try {
          this.validateTokenAtPosition(token, position+1, (token) => this.plan[position] = token);
        } catch (e) {
          console.error(e);
          throw Error(`Failed to add ${token.label} token to the scroll.`);
        }
    }

    this.removeTokenAtPosition = function(position){
      this.plan[position] = null;
    }

    this.validatePlan = function() {
      this.plan.forEach((t,i) => {
        this.validateTokenAtPosition(t, i+1);
      });
      return true;
    }

    this.validateTokenAtPosition = function(token, position, callBack){
      console.log("token", token, "position", position, "callback", callBack);
      if (this.scroll.nodeTypes[position] === PORTAL) {
          throw new Error(`You have reached the end of the scroll, no more tokens can be added.`);
      }

      if (token === null) {
        return;
      }

      if (!token.tokenType){
        throw new Error(`Unexpected instruction [${token}] at position ${position}.`);
      }

      if (token.tokenType === this.scroll.nodeTypes[position]) {
        if (token.tokenType === CONDITIONAL) {
          let T = this.scroll.nodeGraph[position].indexOf(1);
          let F = this.scroll.nodeGraph[position].indexOf(2);
          token.command.exec = () => nextStep (token.command.test) ? T : F;

          T = (this.scroll.nodeTypes[T] === PORTAL) ? 'usePortal()' : `gotoLine( ${T} )`;
          F = (this.scroll.nodeTypes[F] === PORTAL) ? 'usePortal()' : `gotoLine( ${F} )`;

          //token.label += ` goto(${T}) : goto(${F})`;
          token.command.key = token.command.key.replace(/\?/g,` ${T}; else ${F}`);
        }
        if (callBack) {
          callBack(token, position);
        }
      } else {
          throw new Error(`Invalid token [${token.label}] for scroll position ${position}.  Expected ${this.settings.nodeTypes[position].label} but was ${token.tokenType.label}`);
      }
    }
}
