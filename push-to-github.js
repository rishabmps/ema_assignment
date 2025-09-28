import { getUncachableGitHubClient } from './github-connection.js';
import { execSync } from 'child_process';

async function pushToGitHub() {
  try {
    console.log('🔄 Checking git status...');
    
    // Get the current commit hash
    const currentCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    console.log(`Current commit: ${currentCommit}`);
    
    // Get the GitHub client
    const octokit = await getUncachableGitHubClient();
    
    console.log('✅ GitHub client authenticated successfully');
    
    // Get repository info
    const owner = 'rishabmps';
    const repo = 'ema_assignment';
    
    // Get the current branch reference
    const { data: ref } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: 'heads/main'
    });
    
    console.log(`Current remote commit: ${ref.object.sha}`);
    
    if (currentCommit === ref.object.sha) {
      console.log('✅ Already up to date!');
      return;
    }
    
    // Update the reference to point to our current commit
    await octokit.rest.git.updateRef({
      owner,
      repo,
      ref: 'heads/main',
      sha: currentCommit
    });
    
    console.log('🚀 Successfully pushed to GitHub!');
    console.log(`Repository: https://github.com/${owner}/${repo}`);
    
  } catch (error) {
    console.error('❌ Error pushing to GitHub:', error.message);
    
    // Fallback: provide manual instructions
    console.log('\n📝 Manual push instructions:');
    console.log('1. Open the Shell tab in Replit');
    console.log('2. Run: git add .');
    console.log('3. Run: git commit -m "Update layout and fix dashboard issues"');
    console.log('4. Run: git push origin main');
  }
}

pushToGitHub();