class ThemesLoader
  def initialize(path)
    @path = if path.is_a? Pathname
              path
            else
              Pathname.new(path)
            end
  end

  def call
    content = YAML.safe_load(@path.read)
    content['themes'].each do |theme_conf|
      theme = Theme
        .create_with(title: theme_conf['title'])
        .find_or_create_by!(slug: theme_conf['slug'])

      theme_conf['widgets'].each do |widget_conf|
        Widget
          .create_with(widget_conf.merge(theme: theme))
          .find_or_create_by!(slug: widget_conf['slug'])
      end
    end
  end
end
