/// <reference lib="dom" />

export class ResourceManager {
  private static instance: ResourceManager;
  private resources: Map<string, number> = new Map(); // resource name -> quantity

  private constructor() {
    // Initialize with some default resources
    this.resources.set('Classroom A', 1);
    this.resources.set('Classroom B', 1);
    this.resources.set('Projector', 5);
    this.resources.set('Whiteboard', 10);
  }

  public static getInstance(): ResourceManager {
    if (!ResourceManager.instance) {
      ResourceManager.instance = new ResourceManager();
    }
    return ResourceManager.instance;
  }

  allocateResource(resourceName: string): boolean {
    const current = this.resources.get(resourceName);
    if (current && current > 0) {
      this.resources.set(resourceName, current - 1);
      return true;
    }
    return false;
  }

  releaseResource(resourceName: string): void {
    const current = this.resources.get(resourceName) || 0;
    this.resources.set(resourceName, current + 1);
  }

  getAvailableResources(): Map<string, number> {
    return new Map(this.resources);
  }
}