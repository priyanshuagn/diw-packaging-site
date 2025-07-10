import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Users, Settings, Globe, FileText, ImageIcon, Database, Shield } from "lucide-react"

export default function AdminHelp() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
        <p className="text-gray-600">Learn how to manage your DIW Packaging website</p>
      </div>

      <Tabs defaultValue="getting-started" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Welcome to DIW Admin</h3>
                <p className="text-gray-600 mb-4">
                  This admin panel allows you to manage all aspects of your DIW Packaging website. Here's what you can
                  do based on your role:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-gold text-white">Admin</Badge>
                      <h4 className="font-medium">Full Access</h4>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Manage all content (blog, portfolio)</li>
                      <li>• User management and permissions</li>
                      <li>• Site settings and configuration</li>
                      <li>• Analytics and reporting</li>
                      <li>• Backup and maintenance</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Editor</Badge>
                      <h4 className="font-medium">Content Only</h4>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Create and edit blog posts</li>
                      <li>• Manage portfolio items</li>
                      <li>• Upload and organize media</li>
                      <li>• Translate content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Blog Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Creating a New Blog Post</h4>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Navigate to Blog → New Post</li>
                    <li>Enter title and excerpt</li>
                    <li>Select language and status</li>
                    <li>Write content using the rich text editor</li>
                    <li>Add tags and featured image</li>
                    <li>Configure SEO settings</li>
                    <li>Save as draft or publish</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-medium mb-2">AI Content Generation</h4>
                  <p className="text-sm text-gray-600">
                    Use the "AI Generate" button to create initial content based on your title. You can then edit and
                    customize the generated content.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Media Library
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Uploading Files</h4>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Go to Media Library</li>
                    <li>Click "Upload Files"</li>
                    <li>Select images or documents</li>
                    <li>Add alt text for accessibility</li>
                    <li>Organize in folders if needed</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Supported Formats</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">JPG</Badge>
                    <Badge variant="outline">PNG</Badge>
                    <Badge variant="outline">SVG</Badge>
                    <Badge variant="outline">PDF</Badge>
                    <Badge variant="outline">WebP</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Multi-Language Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Translating Content</h4>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Create content in your primary language</li>
                    <li>Go to Translations section</li>
                    <li>Select the content to translate</li>
                    <li>Choose target language</li>
                    <li>Add translated text</li>
                    <li>Review and publish</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Supported Languages</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>🇺🇸 English</div>
                    <div>🇸🇰 Slovak</div>
                    <div>🇨🇿 Czech</div>
                    <div>🇩🇪 German</div>
                    <div>🇪🇸 Spanish</div>
                    <div>🇮🇹 Italian</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Updating Contact Information</h4>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Navigate to Settings → Site Settings</li>
                    <li>Update company information</li>
                    <li>Modify contact details</li>
                    <li>Update social media links</li>
                    <li>Save changes</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Contact Form Management</h4>
                  <p className="text-sm text-gray-600">
                    View and respond to contact form submissions in the Contact Forms section. You can export data and
                    set up email notifications.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Roles & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">User Roles</h3>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-gold" />
                      <h4 className="font-medium">Administrator</h4>
                      <Badge className="bg-gold text-white">Full Access</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium mb-2">Content Management</h5>
                        <ul className="text-gray-600 space-y-1">
                          <li>✓ Create, edit, delete blog posts</li>
                          <li>✓ Manage portfolio items</li>
                          <li>✓ Upload and organize media</li>
                          <li>✓ Manage translations</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">System Management</h5>
                        <ul className="text-gray-600 space-y-1">
                          <li>✓ User management</li>
                          <li>✓ Site settings</li>
                          <li>✓ Analytics access</li>
                          <li>✓ Backup & maintenance</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <h4 className="font-medium">Editor</h4>
                      <Badge variant="secondary">Content Only</Badge>
                    </div>

                    <div className="text-sm">
                      <h5 className="font-medium mb-2">Permissions</h5>
                      <ul className="text-gray-600 space-y-1">
                        <li>✓ Create, edit blog posts</li>
                        <li>✓ Manage portfolio items</li>
                        <li>✓ Upload media files</li>
                        <li>✓ Add translations</li>
                        <li>✗ User management</li>
                        <li>✗ Site settings</li>
                        <li>✗ System maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Adding New Users</h3>
                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                  <li>Navigate to Users → Add New User</li>
                  <li>Enter user details (name, email, password)</li>
                  <li>Select appropriate role (Admin or Editor)</li>
                  <li>Set permissions if needed</li>
                  <li>Send invitation email</li>
                  <li>User receives email with login instructions</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Backup & Recovery
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Automatic Backups</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    The system automatically creates backups daily at 2:00 AM UTC. Backups include database and media
                    files.
                  </p>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-1">Backup Schedule</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Daily: Last 7 days</li>
                      <li>• Weekly: Last 4 weeks</li>
                      <li>• Monthly: Last 12 months</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Manual Backup</h4>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Go to Backup section</li>
                    <li>Click "Create Backup Now"</li>
                    <li>Wait for completion</li>
                    <li>Download backup file if needed</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Staging Environment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Testing Changes</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Use the staging environment to test changes before publishing to the live site.
                  </p>

                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Make changes in admin panel</li>
                    <li>Click "Deploy to Staging"</li>
                    <li>Review changes on staging URL</li>
                    <li>If satisfied, deploy to production</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h5 className="font-medium text-yellow-900 mb-1">Important</h5>
                  <p className="text-sm text-yellow-800">
                    Always test major changes on staging before deploying to production.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
