import subprocess
import os
import signal
import sys

def run_npm_command(directory):
    # Use 'npm.cmd' on Windows, 'npm' otherwise
    npm = 'npm.cmd' if os.name == 'nt' else 'npm'
    
    try:
        return subprocess.Popen(
            [npm, 'run', 'dev'],
            cwd=directory,
            shell=True
        )
    except Exception as err:
        print(f"Failed to start process in {directory}:", err)
        return None

def run_commands():
    # Define base directories
    base_dir = os.path.dirname(os.path.abspath(__file__))
    frontend_dir = os.path.join(base_dir, 'frontend')
    backend_dir = os.path.join(base_dir, 'backend')

    # Start both frontend and backend
    frontend_process = run_npm_command(frontend_dir)
    backend_process = run_npm_command(backend_dir)

    # Handle process termination
    def cleanup(signum, frame):
        if frontend_process:
            frontend_process.terminate()
        if backend_process:
            backend_process.terminate()
        sys.exit(0)

    # Register signal handlers
    signal.signal(signal.SIGINT, cleanup)
    signal.signal(signal.SIGTERM, cleanup)

    # Wait for processes to complete
    if frontend_process:
        frontend_process.wait()
    if backend_process:
        backend_process.wait()

if __name__ == "__main__":
    run_commands()